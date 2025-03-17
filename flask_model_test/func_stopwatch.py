import time

def stopwatch(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()

        result = func(*args, **kwargs)

        end_time = time.time()
        elapsed_time = end_time - start_time

        elapsed_minutes = int(elapsed_time // 60)

        if elapsed_time > 60:
            print(f" ⏳ {elapsed_minutes}분 {elapsed_time:.2f}초")
        else:
            print(f" ⏳ {elapsed_time:.2f}초")

        return result
    return wrapper