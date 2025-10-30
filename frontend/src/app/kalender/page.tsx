import React from "react";
import styles from './kalender.module.css';

export default function KalenderPage() {
  return (
    <div>
        <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FBerlin&showPrint=0&src=Z2VsdGVuZG9yZmVyLmZlcmllbnByb2dyYW1tQGdtYWlsLmNvbQ&src=ZGUuZ2VybWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%230b8043"
            className={`${styles.kalender}`}>
        </iframe>
    </div>
  );
}