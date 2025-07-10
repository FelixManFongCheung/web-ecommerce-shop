// app/actions/cart.ts
'use server'

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

type CartResponse = {
  success: boolean
  message?: string
  error?: string
  cartID?: string
}

export async function addToCart(identifier: string, productId: string): Promise<CartResponse> {
  try {
    const supabase = await createClient()
    const cookieStore = await cookies()
    const cartCookie = cookieStore.get('cart')

    // If cart exists, update it
    if (cartCookie) {
      const cartID = cartCookie.value
      
      // Get existing cart data
      const { data: existingData, error: fetchError } = await supabase
        .from('sessions')
        .select('products')
        .eq('cartID', cartID)
        .single()

      if (fetchError) throw fetchError

      // Combine existing and new products
      const updatedProducts = existingData?.products 
        ? [...existingData.products, productId].flat()
        : [productId]

      // Update cart
      const { error: updateError } = await supabase
        .from('sessions')
        .upsert({
          cartID: cartID,
          products: updatedProducts
        }, {
          onConflict: 'cartID'
        })

      if (updateError) throw updateError

      // Revalidate after successful update
      revalidatePath('/cart')

      return {
        success: true,
        message: "Cart updated successfully!"
      }
    }

    // Create new cart
    const ONE_MONTH = 60 * 60 * 24 * 30 // 30 days
    
    const { error: insertError } = await supabase
      .from('sessions')
      .insert({
        cartID: identifier,
        products: [productId],
        expires_in: new Date(Date.now() + (ONE_MONTH * 1000)).toISOString(),
      })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      throw insertError
    }

    // Set cookie
    (await cookies()).set('cart', identifier, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ONE_MONTH
    })

    // Revalidate after successful creation
    revalidatePath('/cart')

    return {
      success: true,
      message: "Cart created successfully!",
      cartID: identifier
    }

  } catch (error) {
    console.error('Cart action error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}