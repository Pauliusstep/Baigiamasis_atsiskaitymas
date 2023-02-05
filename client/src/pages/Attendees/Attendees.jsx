import { useEffect, useState } from "react"
import { LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components';

const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    width: 800px;
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
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAttendeesAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                phone,
                userId: 1
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setAttendees(data);
            setName('');
            setSurname('');
            setEmail('');
            setPhone('');
        })
    }


    return (
        <AttendeesList>
            <form onSubmit={handleAttendeesAdd}>
                <input
                    placeholder="Name" 
                    required 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                />
                <input 
                    placeholder="Surname" 
                    required 
                    onChange={(e) => setSurname(e.target.value)} 
                    value={surname}
                />
                <input 
                    placeholder="Email" 
                    type="email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
                <input 
                    placeholder="Phone" 
                    required 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone}
                />
                <button>Add</button>
            </form>
            {attendees.map((att) => (
                <AttendeesListItem key={att.id}>
                    <span>Name: {att.name}</span>
                    <span>Surname: {att.surname}</span>
                    <span>Email: {att.email}</span>
                    <span>Phone: {att.phone}</span>
                </AttendeesListItem>
            ))}
        </AttendeesList>
    );
}