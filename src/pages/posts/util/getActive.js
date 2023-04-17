export default function getActive(time) {
  const date = new Date(time);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `Active ${interval} year${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `Active ${interval} month${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `Active ${interval} day${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `Active ${interval} hour${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 10) {
    return `Active ${interval} minutes ago`;
  }

  return "Active now";
}
