import csv
from datetime import datetime, timedelta
import argparse

def create_csv(start_date: str, start_amount: int, increment_amount: int, end_amount: int):
    # Convert start date string to datetime object
    start_date = datetime.strptime(start_date, "%B %d, %Y")

    # Initialize increment values
    date_increment = timedelta(weeks=1)

    # Calculate the largest amount
    num_increments = (end_amount - start_amount) // increment_amount
    largest_amount = start_amount + num_increments * increment_amount

    # Open (and create) a CSV file
    with open('output.csv', 'w', newline='') as file:
        writer = csv.writer(file)

        # Write the header
        writer.writerow(["Date", "Total Paid", "Debt Balance"])

        # While amount is less than or equal to end_amount
        while start_amount <= end_amount:
            # Write the row with current date, amount, and reverse amount
            writer.writerow([start_date.strftime("%B %d, %Y"), f'${start_amount:.2f}', f'${largest_amount:.2f}'])

            # Increment date and amount, decrement largest_amount
            start_date += date_increment
            start_amount += increment_amount
            largest_amount -= increment_amount

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a CSV file with dates and amounts.")
    parser.add_argument('start_date', type=str, help="Starting date in 'Month Day, Year' format.")
    parser.add_argument('start_amount', type=int, help="Starting amount in dollars.")
    parser.add_argument('increment_amount', type=int, help="Increment amount in dollars.")
    parser.add_argument('end_amount', type=int, help="Ending amount in dollars.")
    args = parser.parse_args()

    create_csv(args.start_date, args.start_amount, args.increment_amount, args.end_amount)
