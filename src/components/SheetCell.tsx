
function SheetCell(props:any){
    const { rollScore, inputScore, currentRoll, onInputScoreChange, i, el} = props;
    return (
        <td className = {rollScore === currentRoll ? "selected" : ""}>{(rollScore) === -1 ? undefined : rollScore} {i+el === currentRoll && <input type="text" value={inputScore} onChange={onInputScoreChange} /> } </td>
    )
}

export default SheetCell;