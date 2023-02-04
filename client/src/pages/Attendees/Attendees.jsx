import { useEffect, useState } from "react"
import { API_URL, LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components';

const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    width: 500px;
`;

const AttendeesListItem = styled.li`
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 /23%);
    display: flex;
    justify-content: space-between;
    padding: 10px 30px 10px 30px;
`;

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AttendeesList>
            {attendees.map((att) => (
                <AttendeesListItem key={att.id}>
                    <span>Vardas: {att.name}</span>
                    <span>Pavardė: {att.surname}</span>
                    <span>El.paštas: {att.email}</span>
                    <span>Tel.Nr: {att.phone}</span>
                </AttendeesListItem>
            ))}
        </AttendeesList>
    );
}