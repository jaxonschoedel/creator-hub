create table if not exists submissions (
  id text primary key,
  created_at text not null,
  data text not null
);
