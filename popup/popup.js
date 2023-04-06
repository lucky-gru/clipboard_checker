function init() {
  document
    .getElementById("generatePrimary")
    .addEventListener("click", function () {
      document.getElementById("primary").value = generateEthereumAddress();
    });

  document
    .getElementById("generateSecondary")
    .addEventListener("click", function () {
      document.getElementById("secondary").value = generateEthereumAddress();
    });

  document
    .getElementById("compare")
    .addEventListener("click", function (event) {
      var p = document.getElementById("primary").value || "";
      var s = document.getElementById("secondary").value || "";
      let max = p.length > s.length ? p.length : s.length;
      let p_spans = "",
        s_spans = "";
      for (let i = 0; i < max; i++) {
        p_spans += `<span style="background:${
          p[i] != s[i] ? "red" : "black"
        };">${i < p.length ? p[i] : ""}</span>`;
        s_spans += `<span style="background:${
          p[i] != s[i] ? "red" : "black"
        };">${i < s.length ? s[i] : ""}</span>`;
      }
      document.getElementById("styled_primary").innerHTML = p_spans;
      document.getElementById("styled_secondary").innerHTML = s_spans;
      document.getElementById("say").innerHTML =
        p === s ? "Identical" : "Not identical";
    });
}

function randomHex(n) {
  let bytes = new Uint8Array(n);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateEthereumAddress() {
  var privateKey = "0x" + randomHex(32);
  var wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

init();
