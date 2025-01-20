interface CookieOptions {
  path?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  expires?: Date;
  maxAge?: number;
  domain?: string;
  [key: string]: string | boolean | number | Date | undefined;
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const {
    path = "/",
    secure = true,
    sameSite = "strict",
    expires,
    maxAge,
    domain,
    ...rest
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (path) cookieString += `;path=${path}`;
  if (domain) cookieString += `;domain=${domain}`;
  if (secure) cookieString += ";secure";
  if (sameSite) cookieString += `;samesite=${sameSite}`;
  if (expires) cookieString += `;expires=${expires.toUTCString()}`;
  if (maxAge) cookieString += `;max-age=${maxAge}`;

  Object.entries(rest).forEach(([key, value]) => {
    cookieString += `;${key}=${value}`;
  });

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split(";");
  const cookieName = encodeURIComponent(name);

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(cookieName + "=")) {
      return decodeURIComponent(cookie.substring(cookieName.length + 1));
    }
  }
  return undefined;
};

export const removeCookie = (name: string, path = "/") => {
  // Set expiration to past date to remove the cookie
  setCookie(name, "", {
    path,
    expires: new Date(0),
  });
};
