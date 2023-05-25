import csv
from datetime import datetime, timedelta
import argparse

def create_csv(start_amount: int, increment_amount: int, end_amount: int):
    # Initialize start date
    start_date = datetime(2023, 5, 25)

    # Initialize increment values
    date_increment = timedelta(weeks=1)

    # Open (and create) a CSV file
    with open('output.csv', 'w', newline='') as file:
        writer = csv.writer(file)

        # Write the header
        writer.writerow(["Date", "Amount ($)"])

        # While amount is less than or equal to end_amount
        while start_amount <= end_amount:
            # Write the row with current date and amount
            writer.writerow([start_date.strftime("%Y-%m-%d"), f'${start_amount:.2f}'])

            # Increment date and amount
            start_date += date_increment
            start_amount += increment_amount

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a CSV file with dates and amounts.")
    parser.add_argument('start_amount', type=int, help="Starting amount in dollars.")
    parser.add_argument('increment_amount', type=int, help="Increment amount in dollars.")
    parser.add_argument('end_amount', type=int, help="Ending amount in dollars.")
    args = parser.parse_args()

    create_csv(args.start_amount, args.increment_amount, args.end_amount)
