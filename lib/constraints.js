const kast = require("./kast.js")

const clean = cs => cs
  .map(s => s.replace(/ ==K true/g,"").trim())
  .map(s => (/ ==K false$/.test(s) ? "¬( " + s.slice(0, -10) + " )" : "     " + s + "  "))
  .join("\n")
  .replace(/115792089237316195423570985008687907853269984665640564039457584007913129639936/g,"pow256")
  .replace(/1461501637330902918203684832716283019655932542976/g,"pow160")
  .replace(/-57896044618658097711785492504343953926634992332820282019728792003956564819968/g,"minSInt256")
  .replace(/57896044618658097711785492504343953926634992332820282019728792003956564819967/g,"maxSInt256")
  .replace(/\.\_\d\d+:\w+/g, " ")
  .replace(/([^\w]|^)Int([^\w]|$)/g, (a, b, c) => b + c)
  .replace(/==K/g, "==")
  .replace(/ mod /g, " % ")
  .replace(/  /g, " ")

const deltaC = (state, step) => {
  if(step.from.split("_")[1] in state.nodes && step.to.split("_")[1] in state.nodes) {
    let c1 = state
      .nodes[step.from.split("_")[1]]
      .term.args
      .map(s => kast.format(s))
      // .split("\n")
    let c2 = state
      .nodes[step.to.split("_")[1]]
      .term.args
      // .map(c => c.token)
      // .split("\n")
    let deltaCRaw = c2
      .filter(c => c1.indexOf(kast.format(c)) == -1)
    return deltaCRaw
    // .map(c => clc.xterm(215)(c))
      // .join("\n");
  } else {
    return [];
  }
}


module.exports = {
  clean,
  deltaC
}
