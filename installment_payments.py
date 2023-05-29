import csv
from datetime import datetime, timedelta
import argparse

def create_csv(start_date: str, start_amount: int, increment_amount: int, end_amount: int):
    # Convert string argument to datetime object
    start_date = datetime.strptime(start_date, "%b %d %Y")

    date_increment = timedelta(weeks=1)

    with open('output.csv', 'w', newline='') as file:
        writer = csv.writer(file)

        # Header
        writer.writerow(["Date", "Total Paid", "Payment", "Debt Balance"])

        # Rows
        while start_amount < end_amount:

            # Final remainder payment
            if start_amount + increment_amount > end_amount:
                increment_amount = end_amount - start_amount

            debt_balance = end_amount - start_amount
            writer.writerow([start_date.strftime("%b %d %Y"), f'${start_amount:.2f}', f'${increment_amount:.2f}', f'${debt_balance:.2f}'])

            start_date += date_increment
            start_amount += increment_amount

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a CSV file with dates and amounts.")
    parser.add_argument('start_date', type=str, help="Starting date in 'Jun 1 2023' format.")
    parser.add_argument('start_amount', type=int, help="Starting amount in dollars.")
    parser.add_argument('increment_amount', type=int, help="Increment amount in dollars.")
    parser.add_argument('end_amount', type=int, help="Ending amount in dollars.")
    args = parser.parse_args()

    create_csv(args.start_date, args.start_amount, args.increment_amount, args.end_amount)
