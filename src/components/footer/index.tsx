import styles from './footer.module.scss';
import Link from 'next/link';
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.about}>
        <p>Proxy Archive</p>
        <br />
        <p>Your gateway to exquisite vintage garments. We preserve pieces of history and showcase excellent quality, hoping to store an enduring sense of affection on your sentimental harddrive.</p>
        <br />
        <a 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.button}
        >
          @proxy__archive
        </a>
        <br /><br />
        <p>©{new Date().getFullYear()}</p>
      </div>
      <div className={styles.menu}>
        <p>Menu</p>
        <br />
        <div className={styles.links}>
          <Link href='/contact'>Contact us</Link>
          <Link href='/'>Shipping</Link>
          <Link href='/'>Return Policy</Link>
          <Link href='/'>Terms and conditions</Link>
        </div>
      </div>
      <div className={styles.newsletter}>
        <strong>Never Miss a Drop!</strong>
        <br /><br />
        <p>Sign up to receive exclusive restock updates, discounts and promotions.</p>
        <br />
        <div className={styles.input}>
          <input type="email" placeholder="Enter you e-mail address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  )
};