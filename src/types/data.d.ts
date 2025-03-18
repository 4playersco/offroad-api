interface RawUser {
  id: string;
  role: string;
  account_type: string;
  account_status: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  events?: RawEventDetails[];
}

interface RawEventDetails {
  id: string;
  title: string;
  type: EventType;
  start_time: string;
  end_time: string;
  rally_address: string;
}
