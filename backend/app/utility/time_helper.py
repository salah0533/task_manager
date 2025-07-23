from datetime import datetime
import pytz

def convert_utc_to_algiers(utc_time: datetime) -> datetime:
    if not utc_time:
        return None
    
    if utc_time.tzinfo is None:
        return None
    
    # Convert to Africa/Algiers time
    algiers_tz = pytz.timezone("Africa/Algiers")
    local_time = utc_time.astimezone(algiers_tz)
    
    return local_time.replace(microsecond=0)