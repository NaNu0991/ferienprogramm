import React from "react";
import styles from './programmliste.module.css';

export default function ProgrammlistePage() {
    return (
        <div>
            <iframe src="https://calendar.google.com/calendar/embed?src=geltendorfer.ferienprogramm%40gmail.com&ctz=Europe%2FBerlin&mode=AGENDA"
                    className={`${styles.programmliste}`}>
            </iframe>
        </div>
    );
}