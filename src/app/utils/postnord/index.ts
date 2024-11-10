// interface PostNordServicePoint {
//     servicePointId: string;
//     name: string;
//     streetName: string;
//     streetNumber: string;
//     postalCode: string;
//     city: string;
// }

interface PostNordShippingRate {
    serviceCode: string;
    serviceName: string;
    price: number;
    estimatedDeliveryDays: number;
}

export async function getPostNordRates(
    fromZip: string,
    toZip: string,
    weight: number
): Promise<PostNordShippingRate[]> {
    const POSTNORD_API_KEY = process.env.POSTNORD_API_KEY;
    const POSTNORD_API_URL = 'https://api2.postnord.com/rest/shipping/v1/rates';

    try {
        const response = await fetch(POSTNORD_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${POSTNORD_API_KEY}`,
        },
        body: JSON.stringify({
            dateTime: new Date().toISOString(),
            from: {
            countryCode: 'DK',
            postalCode: fromZip,
            },
            to: {
            countryCode: 'DK',
            postalCode: toZip,
            },
            items: [{
            weight: weight,
            quantity: 1,
            }],
        }),
        });

        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('PostNord API Error:', error);
        // Fallback to default rates if API fails
        return getDefaultRates();
    }
}

// Fallback rates if API fails
function getDefaultRates(): PostNordShippingRate[] {
    return [
        {
        serviceCode: 'HOME',
        serviceName: 'PostNord Home Delivery',
        price: 49,
        estimatedDeliveryDays: 2,
        },
        {
        serviceCode: 'PICKUP',
        serviceName: 'PostNord Pickup Point',
        price: 29,
        estimatedDeliveryDays: 2,
        },
    ];
}



/// Backend: 
// import { getPostNordRates } from '@/utils/postnord';

// export async function POST(req: Request) {
//   try {
//     const { items, shippingZip } = await req.json();
    
//     // Calculate total weight from items
//     const totalWeight = items.reduce((acc, item) => acc + (item.weight * item.quantity), 0);
    
//     // Get shipping rates from PostNord
//     const shippingRates = await getPostNordRates(
//       process.env.STORE_ZIP_CODE!, // Your store's zip code
//       shippingZip,
//       totalWeight
//     );

//     // Create Stripe session with dynamic shipping options
//     const session = await stripe.checkout.sessions.create({
//       // ... other options ...
//       shipping_options: [
//         // Always include pickup option
//         {
//           shipping_rate_data: {
//             type: 'fixed_amount',
//             fixed_amount: {
//               amount: 0,
//               currency: 'dkk',
//             },
//             display_name: 'Pickup from Store',
//             delivery_estimate: {
//               minimum: { unit: 'business_day', value: 0 },
//               maximum: { unit: 'business_day', value: 0 },
//             },
//           },
//         },
//         // Add PostNord shipping options
//         ...shippingRates.map(rate => ({
//           shipping_rate_data: {
//             type: 'fixed_amount',
//             fixed_amount: {
//               amount: Math.round(rate.price * 100), // Convert to øre
//               currency: 'dkk',
//             },
//             display_name: rate.serviceName,
//             delivery_estimate: {
//               minimum: {
//                 unit: 'business_day',
//                 value: rate.estimatedDeliveryDays,
//               },
//               maximum: {
//                 unit: 'business_day',
//                 value: rate.estimatedDeliveryDays + 1,
//               },
//             },
//           },
//         })),
//       ],
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.error();
//   }
// }

//Frontend: 
// const handleCheckout = async () => {
//     const response = await fetch('/api/embedded-checkout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         items: cartItems,
//         shippingZip: '2100', // Get this from user input
//       }),
//     });
//     // ... rest of checkout logic ...
// };