import { useState } from 'react';
import User from "./user";

const Index = () => {
    const [user, setUser] = useState("mehrnoosh");
    const handleLog = () => {
        console.log('sallllllaammmmm')
    }
    return (
        <>
        <h1>Hello</h1>
        <User user={user} handleLog={handleLog} />
        </>
    )
}
export default Index;