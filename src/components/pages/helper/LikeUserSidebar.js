import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Link } from 'react-router-dom';import { Chip } from 'primereact/chip';
import { getFirstChar } from '../../../utils/helpers';


const LikeUserSidebar = ({likes}) => {
    const [visible, setVisible] = useState(false);

    const content = username => (
        <>
            <span className="bg-primary border-circle w-2rem h-2rem 
                flex align-items-center justify-content-center">{getFirstChar(username)}</span>
            <span className="ml-2 font-medium">
                <Link className='user-link' to={`/user/${username}`}>
                    {username}
                </Link>
            </span>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} position={'right'} onHide={() => setVisible(false)}>
                <h4>Likes ({likes.length})</h4>
                {likes.length > 0 ? 
                    likes.map((like, i) => <div key={i} className="mt-2">
                        <Chip className="pl-0 pr-3" template={content(like.username)} />
                    </div>):
                    "No likes on post yet!"
                }
                <p>
                    
                </p>
            </Sidebar>
            <span onClick={() => setVisible(true)} 
                style={{cursor: 'pointer'}} title="View likes">
                {likes.length}
            </span>
        </div>
    )
}

export default LikeUserSidebar