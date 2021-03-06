export function joinGame(status){
  return{
    type: 'JOIN_GAME',
    payload: status
  }
}

export function joinAccepted(id){
  return{
    type: 'JOIN_ACCEPTED',
    payload: id
  }
}

export function startGame() {
  return {
    type: 'START_GAME'
  };
}

export function newBlock(prop) {
  return {
    type: 'NEW_BLOCK',
    payload:prop
  };
}
export function serverNewBlock(prop) {
  return {
    type: 'SERVER_NEW_BLOCK',
    payload:prop
  };
}

export function moveBlock() {
  return {
    type: 'MOVE_BLOCK'
  };
}

export function gameOver() {
  return{
    type: 'GAME_OVER'
  }
}

export function shareGradient(grad){
  return {
    type: 'SHARE_GRADIENT',
    payload:grad
  };
}

export function setGradient(grad){
  return {
    type: 'SET_GRADIENT',
    payload:grad
  };
}
