import React from "react";
import styles from './start.module.css';
import Image from "next/image";
import {Alert, Box, Button, Divider, Link, Paper, Stack, Typography } from "@mui/material";

export default function StartPage() {
    return (
        <Box className={`${styles.centered_box}`} >
            <Paper
                elevation={4}
                className={`${styles.custom_paper}`}
            >
                <Box mb={2} display="flex" justifyContent="center">
                    <Image
                        src="/landing_page/geltendorf_logo.png" // Passe ggf. das Bild an, im /public Ordner ablegen!
                        alt="Logo Geltendorfer Ferienprogramm"
                        width={600}
                        height={600}
                    />
                </Box>

                <Typography variant="h5" color="primary" gutterBottom>
                    Es ist geschafft:<br /> Das 27. Geltendorfer Ferienprogramm ist da!
                </Typography>

                <Typography variant="h5" mb={1.5} >
                    27 Jahre Ferienprogramm, 27 Jahre actionreiche, spannende Sommerferien!
                </Typography>

                <Typography mb={2}>
                    Auch dieses Jahr freuen wir uns auf unsere Highlights:
                </Typography>

                <Typography variant="subtitle1" fontWeight={600} color="primary" mb={1}>
                    Das große Lagerfeuer und den Hüttenbau
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Alert severity="info" sx={{ mb: 3 }}>
                    <div>
                        <b>Ab dem 27. Juni 2025</b> könnt Ihr die Programmliste durchstöbern und Euch registrieren – einfach den Anweisungen auf der rechten Seite folgen!
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <b>Vorab-Anmeldung am 04.07.25 von 14–18 Uhr</b> ist exklusiv für unsere „Mach mit“-Mitglieder und Programmpunkt-Anbietende.
                        <br />
                        <b>Allgemeine Anmeldung: 05.07. (ab 10 Uhr) bis 06.07. (18 Uhr)</b> für alle!
                    </div>
                </Alert>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    mb={3}
                >
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        component={Link}
                        href="/anmeldung"
                    >
                        Zur Registrierung
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        component={Link}
                        href="/programmliste"
                    >
                        Programmliste ansehen
                    </Button>
                </Stack>

                <Alert severity="warning" sx={{ mb: 3, textAlign: "left" }}>
                    <b>Wichtig:</b> Bitte beachtet unsere 2025 angepassten Veranstaltungshinweise
                    & neue Rückerstattungsmodalitäten!
                </Alert>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="body1" mb={2}>
                    Besonderer Dank gilt allen ehrenamtlichen Helfer*innen, die es ermöglichen,<br />
                    das 27. Geltendorfer Ferienprogramm in dieser Vielfalt anzubieten.<br />
                    <br />
                    Herzlich danken wir auch der Gemeinde Geltendorf für die Unterstützung.
                </Typography>

                <Typography variant="body1" mb={3}>
                    Der „Mach mit“-Vorstand und der Arbeitskreis Ferienprogramm wünschen Euch schöne und abwechslungsreiche Ferien!
                </Typography>

                <Button
                    variant="text"
                    color="primary"
                    component={Link}
                    href="https://www.machmit-geltendorf.de"
                    target="_blank"
                    rel="noopener"
                    sx={{ fontWeight: 600 }}
                >
                    Zur Vereinsseite: www.machmit-geltendorf.de
                </Button>
            </Paper>
        </Box>
    );
}