import React,{useEffect,useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import {useDrop} from 'react-dnd';
import {handleMove,gameSubject} from './Game';
import Promote from './Promote'

function Boardsquare({piece , black , position}) {

    const [ promotion, setPromotion] = useState(null)
    useEffect(()=>{ 
      const subscribe = gameSubject.subscribe(
        ({pendingPromotion})=> pendingPromotion && pendingPromotion.to === position ? setPromotion(pendingPromotion):setPromotion(null)
      )
       return ()=> subscribe.unsubscribe()
    },[position])


    const [, drop] = useDrop({
        accept:'piece',
        drop: (item)=>{
            const [fromPosition] = item.id.split('_')
            handleMove(fromPosition,position)
        }
    })
    return (
        <div className= 'board_square' ref={drop}>
            <Square black = {black}>
                {promotion ? <Promote promotion={promotion}/> : piece ?  <Piece piece={piece} position={position} /> : null}
            </Square>
        </div>
    )
}

export default Boardsquare
