import AppointmentsGridComponent from "../components/AppointmentGridComponent";
import { APPOINTMENT_MODE_DEPENDENT } from "../Constants";

const DependentAppointments = () => {
    return (
        <>
            <AppointmentsGridComponent
                title="Dependent Appointments"
                mode={APPOINTMENT_MODE_DEPENDENT}
            />
        </>
    );
};

export default DependentAppointments;
