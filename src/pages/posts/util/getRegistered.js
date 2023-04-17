export default function getregistered(time) {
  const date = new Date(time);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `registered ${interval} year${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `registered ${interval} month${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `registered ${interval} day${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `registered ${interval} hour${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `registered ${interval} minute${interval === 1 ? "" : "s"} ago`;
  }

  return "registered Just now";
}
