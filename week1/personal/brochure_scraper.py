import argparse
import sys
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
)


def fetch_website_raw(url, user_agent=DEFAULT_USER_AGENT, timeout_ms=30000, settle_ms=2000):
    """Load `url` in headless Chromium and return the fully-rendered HTML, unprocessed."""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(user_agent=user_agent)
        page.goto(url, wait_until="load", timeout=timeout_ms)
        page.wait_for_timeout(settle_ms)
        html = page.content()
        browser.close()
    return html

def fetch_website_content(url, user_agent=DEFAULT_USER_AGENT, timeout_ms=30000, settle_ms=2000):
    """Load `url` in headless Chromium and return the extracted title + body text, truncated to 2,000 characters."""
    html = fetch_website_raw(url, user_agent, timeout_ms, settle_ms)
    soup = BeautifulSoup(html, "html.parser")
    title = soup.title.get_text(strip=True) if soup.title else "No title found"
    if soup.body:
        for irrelevant in soup.body(["script", "style", "img", "input"]):
            irrelevant.decompose()
        text = soup.body.get_text(separator="\n", strip=True)
    else:
        text = ""
    return (title + "\n\n" + text)[:2000]

def fetch_website_links(url, user_agent=DEFAULT_USER_AGENT, timeout_ms=30000, settle_ms=2000):
        
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(user_agent=user_agent)
        page.goto(url, wait_until="load", timeout=timeout_ms)
        page.wait_for_timeout(settle_ms)
        html = page.content()
        browser.close()

    soup = BeautifulSoup(html, "html.parser")
    links = [link.get("href") for link in soup.find_all("a")]
    return [urljoin(url, link) for link in links if link]

def _main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url")
    parser.add_argument("--mode", choices=["content", "links", "raw"], default="content")
    args = parser.parse_args()
    if args.mode == "links":
        sys.stdout.write("\n".join(fetch_website_links(args.url)))
    elif args.mode == "raw":
        sys.stdout.write(fetch_website_raw(args.url))
    else:
        sys.stdout.write(fetch_website_content(args.url))


if __name__ == "__main__":
    _main()