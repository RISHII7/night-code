import { describe, expect, it } from "bun:test";

import { COMMANDS } from "../commands";
import { getFilteredCommands } from "./index";

describe("getFilteredCommands", () => {
  it("returns every command for an empty query", () => {
    expect(getFilteredCommands("")).toEqual(COMMANDS);
  });

  it("matches on a command name prefix", () => {
    const result = getFilteredCommands("mo");

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("models");
  });

  it("is case insensitive", () => {
    expect(getFilteredCommands("MODELS")).toEqual(getFilteredCommands("models"));
  });

  it("matches a prefix shared by multiple commands", () => {
    const result = getFilteredCommands("lo");
    const names = result.map((command) => command.name);

    expect(names).toContain("login");
    expect(names).toContain("logout");
  });

  it("returns an empty list when nothing matches", () => {
    expect(getFilteredCommands("definitely-not-a-command")).toEqual([]);
  });

  it("anchors on the prefix rather than matching anywhere in the name", () => {
    // "gin" appears inside "login" but is not a prefix of it. Substring
    // matching here would surface commands the user did not begin typing.
    expect(getFilteredCommands("gin")).toEqual([]);
  });

  it("preserves the declared command order", () => {
    const result = getFilteredCommands("");
    const declaredOrder = COMMANDS.map((command) => command.name);

    expect(result.map((command) => command.name)).toEqual(declaredOrder);
  });
});
