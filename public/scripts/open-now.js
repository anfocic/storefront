// Fills every [data-open-badge] with a live "Open now" / "Closed" state, read
// from the #hours-data JSON injected by Layout.astro. Computes the current day
// and time in the business timezone (business.timezone) when set, else the
// visitor's local time. Parsing mirrors src/lib/hours.ts.
(function () {
  var el = document.getElementById("hours-data");
  var badges = document.querySelectorAll("[data-open-badge]");
  if (!el || !badges.length) return;

  var cfg;
  try {
    cfg = JSON.parse(el.textContent);
  } catch (e) {
    return;
  }

  var JS_DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var WD = { Sun: "sun", Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat" };

  function nowParts() {
    if (cfg.tz) {
      try {
        var f = new Intl.DateTimeFormat("en-US", {
          timeZone: cfg.tz,
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        var p = {};
        f.formatToParts(new Date()).forEach(function (x) {
          p[x.type] = x.value;
        });
        var h = parseInt(p.hour, 10) % 24; // some engines emit "24" at midnight
        return { day: WD[p.weekday], mins: h * 60 + parseInt(p.minute, 10) };
      } catch (e) {
        /* fall through to local time */
      }
    }
    var d = new Date();
    return { day: JS_DAYS[d.getDay()], mins: d.getHours() * 60 + d.getMinutes() };
  }

  function parseRanges(v) {
    if (!v) return [];
    v = String(v).trim();
    if (v === "" || v.toLowerCase() === "closed") return [];
    return v
      .split(",")
      .map(function (part) {
        var m = part.replace(/[–—]/g, "-").match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
        if (!m) return null;
        return { open: +m[1] * 60 + +m[2], close: +m[3] * 60 + +m[4] };
      })
      .filter(Boolean);
  }

  var np = nowParts();
  var ranges = parseRanges(cfg.hours[np.day]);
  var open = ranges.some(function (r) {
    return np.mins >= r.open && np.mins < r.close;
  });

  badges.forEach(function (b) {
    b.textContent = open ? "Open now" : "Closed";
    b.setAttribute("data-state", open ? "open" : "closed");
    b.hidden = false;
  });
})();
