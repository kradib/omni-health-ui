import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { addAppointmentNote } from "../api/appointment";
import ModalComponent from "./ModalComponent";

interface AddAppointmentNotesComponentProps {
    show: boolean;
    appointmentId: number;
    onNoteAdded: any;
    onClose: any;
}

const AddAppointmentNotesComponent: React.FC<
    AddAppointmentNotesComponentProps
> = ({ show, appointmentId, onNoteAdded, onClose }) => {
    const [appointmentNote, setAppointmentNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddNote = async () => {
        setLoading(true);
        const response = await addAppointmentNote(appointmentId, {
            note: appointmentNote,
        });
        setLoading(false);
        onNoteAdded(response.data, response.success ? "success" : "error");
    };

    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title="Add Notes"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <TextField
                    multiline
                    maxRows={5}
                    label="Add Notes"
                    onChange={(e) => setAppointmentNote(e.target.value)}
                    value={appointmentNote}
                />

                <Button
                    variant="contained"
                    disabled={!appointmentNote.length}
                    onClick={handleAddNote}
                    size="large"
                    loading={loading}
                >
                    Add Note
                </Button>
            </ModalComponent>
        </>
    );
};

export default AddAppointmentNotesComponent;
