import { Box, Divider, Link, Typography, Paper } from "@mui/material";

export default function KontaktPage() {
    return (
        <Box
            component={Paper}
            elevation={8}
            sx={{
                maxWidth: 720,
                mx: "auto",
                p: { xs: 4, md: 6 },
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                fontFamily: "'Roboto', sans-serif",
                color: "text.primary",
            }}
        >
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" letterSpacing={1}>
                Impressum
            </Typography>

            <Divider sx={{ mb: 3, borderColor: "primary.main" }} />

            <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Herausgeber
            </Typography>
            <Typography sx={{ mb: 2, lineHeight: 1.6 }}>
                Beispielgemeinde Musterstadt<br />
                Musterstraße 10<br />
                12345 Musterstadt
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}>
                Vertreten durch den Bürgermeister Max Beispiel<br />
                Telefon: <Link href="tel:0123456789">01234/56789-0</Link><br />
                Fax: 01234/56789-23<br />
                E-Mail: <Link href="mailto:info@beispielstadt.de">info@beispielstadt.de</Link><br />
                Aufsichtsbehörde: Beispielkreis Musterkreis
            </Typography>

            <Divider sx={{ my: 3, borderColor: "primary.main" }} />

            <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Inhaltliche Verantwortung nach § 55 Abs. 2 RStV
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}>
                Beispielgemeinde Musterstadt<br />
                Telefon: <Link href="tel:0123456789">01234/56789-0</Link><br />
                Fax: 01234/56789-23<br />
                E-Mail: <Link href="mailto:max.beispiel@beispielstadt.de">max.beispiel@beispielstadt.de</Link>
            </Typography>

            <Divider sx={{ my: 3, borderColor: "primary.main" }} />

            <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Technische Umsetzung
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}>
                Max Mustermann<br />
                Musterweg 1<br />
                12345 Musterstadt<br />
                Telefon: +49 (0)123 4567890<br />
                E-Mail: <Link href="mailto:max.mustermann@example.com">max.mustermann@example.com</Link>
            </Typography>

            <Divider sx={{ my: 3, borderColor: "primary.main" }} />

            <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Nutzungsbedingungen & Urheberrecht
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}>
                Texte, Bilder, Grafiken sowie die Gestaltung dieser Internetseiten unterliegen dem Urheberrecht. Sie dürfen im Rahmen des § 53 UrhG nur zum privaten oder eigenen Gebrauch genutzt werden. Die Vervielfältigung, Verwendung oder Veröffentlichung – auch auszugsweise – ist nur mit vorheriger Zustimmung gestattet.<br /><br />
                Weitere Urheberrechtshinweise und Nutzungsbedingungen findest du auf der offiziellen Website.
            </Typography>

            <Divider sx={{ my: 3, borderColor: "primary.main" }} />

            <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Haftungsausschluss
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}>
                Alle Informationen wurden nach bestem Wissen zusammengestellt; eine Garantie für die Aktualität, Richtigkeit, Vollständigkeit oder Verfügbarkeit kann jedoch nicht übernommen werden. Für Schäden durch Nutzung dieses Angebots wird keine Haftung übernommen. Weitere rechtliche Hinweise siehe Website.
            </Typography>

            <Divider sx={{ my: 3, borderColor: "primary.main" }} />

            <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Links
            </Typography>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                Für externe Inhalte verlinkter Seiten wird keine Verantwortung übernommen. Bei erstmaliger Verknüpfung wurden die Inhalte geprüft, für künftige Änderungen ist der jeweilige Anbieter verantwortlich.
            </Typography>
        </Box>
    );
}
