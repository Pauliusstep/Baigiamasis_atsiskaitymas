import { useContext, useEffect, useState } from "react"
import styled from 'styled-components';
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContextWrapper";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';

const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;  

const HoverOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    
`;

const AttendeesListItem = styled.li`
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 /23%);
    padding: 10px 30px 10px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;

    ${HoverOverlay} {
        visibility: hidden;
    }

    &:hover {
        ${HoverOverlay} {
            visibility: visible
        }
    }
`;

const FormStyled = styled.form`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
 `;

const HoverOverlayContent = styled.div`
    color: red;
    font-size: 20px;
    margin-left: 20px;
    cursor: pointer;
`;

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setAttendees(data);
                }
                setIsLoading(false);
            });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAttendeesAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                phone,
                userId: user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                setAttendees(data);
                setEmail('');
                setName('');
                setSurname('');
                setPhone('');
            }
        })
    }

    const handleDeleteAttendee = (id) => {
        if (window.confirm('Do you really want to delete this expense?')) {
            fetch(`${process.env.REACT_APP_API_URL}/attendees/${id}`, {
                method: 'DELETE', 
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then((res) => res.json())
            .then(data => {
                setAttendees(data);
            });
        }
        }
        

    return (
        <AttendeesList>
            <FormStyled onSubmit={handleAttendeesAdd}>
                <Input
                    placeholder="Name" 
                    required 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                />
                <Input 
                    placeholder="Surname" 
                    required 
                    onChange={(e) => setSurname(e.target.value)} 
                    value={surname}
                />
                <Input 
                    placeholder="Email" 
                    type="email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
                <Input 
                    placeholder="Phone" 
                    required 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone}
                />
                <Button>Add</Button>
           </FormStyled>
            {attendees.map((att) => (
                <AttendeesListItem key={att.id} onClick={() => handleDeleteAttendee(att.id)}>
                    <HoverOverlay>
                        <HoverOverlayContent>DELETE</HoverOverlayContent>
                    </HoverOverlay>
                    <span>Name: {att.name}</span>
                    <span>Surname: {att.surname}</span>
                    <span>Email: {att.email}</span>
                    <span>Phone: {att.phone}</span>
                </AttendeesListItem>    
            ))}
             </AttendeesList>
    );
  
}