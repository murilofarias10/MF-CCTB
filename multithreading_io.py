import time
from concurrent.futures import ThreadPoolExecutor


def read(num):
    time.sleep(2)
    print(f"Reading file {num + 1}")


def square(num):
    print(f"Square of {num}: {num * num}")


start_time = time.time()

nums = list(range(5))

with ThreadPoolExecutor() as executor:
    # Submit all tasks to the executor
    threads = [executor.submit(read, num) for num in nums]
    # threads = [executor.submit(square, num) for num in nums]

    # Wait for all tasks to complete
    for thread in threads:
        thread.result()

end_time = time.time()
print(f"\nDone in: {end_time - start_time}")