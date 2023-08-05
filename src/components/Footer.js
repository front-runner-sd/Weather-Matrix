import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGem, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";

const footer = () => {
  return (
    <footer>
      <section className={styles.footerTopSection}>
        <div className={styles.footerTopLeft}>
          Get connected with me on social networks :
        </div>
        <div>
          <a className={styles.footerLinks} href="https://www.facebook.com/soudip.das.986" target="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a className={styles.footerLinks} href="https://twitter.com/SoudipDas18" target="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a className={styles.footerLinks} href="mailto:iamsoudipdas@gmail.com" target="#">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a className={styles.footerLinks} href="https://www.instagram.com/i_am_soudip_das" target="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a className={styles.footerLinks} href="https://www.linkedin.com/in/thesoudipdas" target="#">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a className={styles.footerLinks} href="https://github.com/front-runner-sd" target="#">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </section>
      <section className={styles.footerMidSection}>
          {/* <!-- Grid row --> */}
          <div className={styles.row}>
            {/* <!-- Grid column --> */}
            <div className={styles.col_1}>
              {/* <!-- Content --> */}
              <h6 className={styles.footerColHeading}>
                <FontAwesomeIcon className={styles.gem}icon={faGem}/>SOUDIP DAS
              </h6>
              <p>
                Hello I am Soudip Das. I've designed the website. I am a web developer with a strong passion for creating 
                innovative and visually stunning websites.
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className={styles.col_2}>
              <h6 className={styles.footerColHeading}>TECH USED</h6>
              <p className={styles.techUsed}>React</p>
              <p className={styles.techUsed}>HTML</p>
              <p className={styles.techUsed}>CSS</p>
              <p className={styles.techUsed}>JAVASCRIPT</p>
            </div>
            {/* <!-- Grid column --> */}
            {/* <!-- Grid column --> */}
            <div className={styles.col_2}>
              {/* <!-- Links --> */}
              <h6 className={styles.footerColHeading}>MY CREATIONS</h6>
              <p>
                <a href="https://secure-password-generator-soudip-das.netlify.app/" target='#' className={styles.myCreation}>
                   S-Password Gen
                </a>
              </p>
              <p>
                <a href='https://doggy-search-by-soudip-das.netlify.app/'target="#"  className={styles.myCreation}>
                  Dog Search App
                </a>
              </p>
              <p>
                <a href='https://guess-the-number-soudip-das.netlify.app/'target="#"  className={styles.myCreation}>
                  Number Game
                </a>
              </p>
              <p>
                <a href="#!"  className={styles.myCreation}>
                  Help
                </a>
              </p>
            </div>
            {/* <!-- Grid column --> */}
            {/* <!-- Grid column --> */}
            <div className={styles.col_4}>
              {/* <!-- Links --> */}
              <h6 className={styles.footerColHeading}>Contact</h6>
              <p>
                <FontAwesomeIcon className={styles.ficons}icon={faHome}/>West Bengal, INDIA
              </p>
              <p>
                <FontAwesomeIcon className={styles.ficons} icon={faEnvelope}/>
                iamsoudipdas@gmail.com
              </p>
              <p>
              <FontAwesomeIcon className={styles.ficons} icon={faPhone}/> + 91 9330816611
              </p>
            </div>
            {/* <!-- Grid column --> */}
          </div>
          {/* <!-- Grid row --> */}
      </section>
      <section className={styles.footerBottomSection}>
        <div className={styles.ftext}>
          <span>Made by SOUDIP DAS</span>
        </div>
        <div className={styles.heart}>❤️</div>
      </section>
    </footer>
  );
};
export default footer;
