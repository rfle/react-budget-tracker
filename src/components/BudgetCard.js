import {Button, Card, Stack} from 'react-bootstrap';
import {currencyFormatter} from "../utils";
import {ProgressBar} from "react-bootstrap";

export default function BudgetCard({name, amount, max, grey, onAddExpenseClick, onViewExpensesClick, hideButtons}) {
    const classNames = [];
    if(amount > max) {
        classNames.push("bg-danger", "bg-opacity-10");
    } else if (grey) {
        classNames.push("bg-light");
    }
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className={"d-flex justify-content-between align-items-baseline"}>

                    <div className={"me-2"}>{name}</div>
                    <div className={"d-flex align-items-baseline"}>
                        {currencyFormatter.format(amount)}
                        {max && (<span
                        className={"text-muted fs-6 ms-1"}>/ {currencyFormatter.format(max)}
                        </span>)}
                    </div>
                </Card.Title>
                {max && (
                <ProgressBar
                    className="rounded-pill"
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />
                    )}
                {!hideButtons && (
                    <Stack direction={"horizontal"} gap={"2"} className={"mt-4"}>
                    <Button variant={"primary"} className={"ms-auto"} onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant={"outline-primary"} onClick={onViewExpensesClick}>View Expenses</Button>
                    </Stack>
                )}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ration = amount / max;
    if (ration < .5) return "primary"
    if (ration < .75) return "secondary"
    return "danger";

}