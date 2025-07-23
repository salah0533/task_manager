from datetime import datetime
import pytz


utc = pytz.utc
local_tz = pytz.timezone("Africa/Algiers")


def convert_utc_to_algiers(utc_time: datetime) -> datetime:
    if not utc_time:
        return None
    
    utc_time = utc.localize(utc_time)
    local_time = utc_time.astimezone(local_tz)

    return local_time.replace(microsecond=0).strftime("%Y-%m-%d %H:%M:%S")