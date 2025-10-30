'use client';
import {
    Box, Button, TextField, Checkbox, FormControlLabel, Typography, Alert,
    FormGroup, FormLabel,
} from "@mui/material";
import {useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AnmeldungPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        buchender: '',
        email: '',
        kind: '',
        programs: [] as number[],
        bemerkung: '',
        checked: false,
    });

    interface Program {
        id: number;
        titel: string;
        beschreibung: string;
        datum: string;
        startzeit?: string | null;
        endzeit?: string | null;
        ort?: string | null;
        plaetze: number;
    }

    useEffect(() => {
        async function fetchPrograms() {
            const { data, error } = await supabase.from('programmtermine').select('*');
            if (error) {
                console.error(error);
            } else if (data) {
                setPrograms(data);
            }
            setLoading(false);
        }
        fetchPrograms();
    }, []);

    if (loading) return <p>Lade Programme...</p>;

    const handleChangeBuchender= (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            buchender: event.target.value,
        }));
    };

    const handleChangeEmail= (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            email: event.target.value,
        }));
    };

    const handleChangeKind= (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            kind: event.target.value,
        }));
    };

    const handleChangeBemerkung= (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            bemerkung: event.target.value,
        }));
    };

    const handleChangeEinverstanden= (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            checked: event.target.checked,
        }));
    };

    const handleProgrammeChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newPrograms = e.target.checked
            ? [...form.programs, id]
            : form.programs.filter(item => item !== id);

        setForm(prev => ({
            ...prev,
            programs: newPrograms,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const anmeldungen = form.programs.map((programId) => {
            const program = programs.find(p => p.id === programId);

            if (program === undefined) {
                console.log("Kein Programm mit dieser ID gefunden");
            } else {
                return { buchender: form.buchender, email: form.email, teilnehmer_kind: form.kind,
                         programmkurs: program.titel, bemerkung: program.beschreibung };
            }
        })

        const { error } = await supabase
            .from('anmeldungen')
            .insert(anmeldungen);

        console.log(error);
    };



    return (
        <div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 480, mx: 'auto', p: 3, background: '#f5f8ff',
                    borderRadius: 2, boxShadow: 3
                }}
            >
                <Typography color="black" variant="h5" mb={2} textAlign="center">
                    Programmbuchung Ferienprogramm
                </Typography>
                <TextField
                    label="Name Teilnehmer/Eltern"
                    name="buchender"
                    value={form.buchender}
                    onChange={handleChangeBuchender}
                    fullWidth required margin="normal"
                />
                <TextField
                    label="E-Mail-Adresse"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChangeEmail}
                    fullWidth required margin="normal"
                />
                <TextField
                    label="Name des Kindes"
                    name="kind"
                    value={form.kind}
                    onChange={handleChangeKind}
                    fullWidth margin="normal"
                />

                <FormLabel sx={{ mt: 2, mb: 1, color: 'black' }}>Programme auswählen:</FormLabel>
                <FormGroup>
                    {programs.map(prg => (
                        <FormControlLabel
                            key={prg.id}
                            control={
                                <Checkbox
                                    onChange={e => handleProgrammeChange(e, prg.id)}
                                />
                            }
                            sx={{ color: 'black' }}
                            label={`${prg.titel}: ${prg.beschreibung} (${prg.datum} um ${prg.startzeit})`}
                        />
                    ))}
                </FormGroup>

                <TextField
                    label="Bemerkungen (optional)"
                    name="bemerkung"
                    value={form.bemerkung}
                    onChange={handleChangeBemerkung}
                    fullWidth
                    multiline
                    minRows={2}
                    margin="normal"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            name="einverstanden"
                            checked={form.checked}
                            onChange={handleChangeEinverstanden}
                            required
                        />
                    }
                    label="Ich bin mit der Datenverarbeitung für die Programmbuchung einverstanden."
                    sx={{ mt: 1, alignItems: 'flex-start', color: 'black' }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    disabled={ !form.checked || !form.buchender || !form.email || form.programs.length === 0 }
                >
                    Jetzt buchen
                </Button>

                {submitted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Danke, Ihre Buchung wurde übermittelt!
                    </Alert>
                )}
            </Box>
        </div>
    );
}