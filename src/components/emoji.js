import Emojify from 'react-emojione';
import React from 'react';

const Emoji = (props) => {
    return (
             <div>
            <Emojify style={{height: 17, width: 15}} >
            {props.message}
            </Emojify>
           </div>
    );
};



export default Emoji;
