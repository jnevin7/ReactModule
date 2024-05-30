import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Card } from 'react-bootstrap';
import axios from 'axios';
function GitHub() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("greg");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, [])
    const getData = async() => {
        const res = await
        axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setData(res.data.items)
                setIsLoading(false);
            });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        getData();
    }

    const listUsers = data.map((user) =>
        <Card key={user.id}>
            <a href={user.html_url}>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={user.avatar_url}
                    alt="Generic placeholder"
                />
            </a>
            <Card.Body>
                <h5>Login: {user.login}</h5>
                <p>Id: {user.id}</p>
            </Card.Body>
        </Card>
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={event => setSearchTerm(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <h3>GitHub Users Results</h3>
            {isLoading &&
                <ReactLoading type="spinningBubbles" color="#444" />
            }
            {listUsers}
        </div>
    );

}
export default GitHub;