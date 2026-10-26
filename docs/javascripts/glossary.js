/* Algorithms glossary: expand the first occurrence of a term with its full
   name and Chinese explanation. Skips code, headings, links, tables and math. */
const GLOSSARY = {
  "ADT": ["Abstract Data Type", "抽象数据类型"],
  "BFS": ["Breadth-First Search", "广度优先搜索"],
  "DFS": ["Depth-First Search", "深度优先搜索"],
  "DAG": ["Directed Acyclic Graph", "有向无环图"],
  "DP": ["Dynamic Programming", "动态规划"],
  "DSU": ["Disjoint Set Union", "并查集"],
  "MST": ["Minimum Spanning Tree", "最小生成树"],
  "SSSP": ["Single-Source Shortest Path", "单源最短路径"],
  "APSP": ["All-Pairs Shortest Path", "全源最短路径"],
  "LIS": ["Longest Increasing Subsequence", "最长递增子序列"],
  "LCS": ["Longest Common Subsequence", "最长公共子序列"],
  "LCA": ["Lowest Common Ancestor", "最近公共祖先"],
  "BST": ["Binary Search Tree", "二叉搜索树"],
  "AVL": ["Adelson-Velsky and Landis tree", "AVL 平衡二叉搜索树"],
  "SCC": ["Strongly Connected Component", "强连通分量"],
  "HLD": ["Heavy-Light Decomposition", "树链剖分"],
  "KMP": ["Knuth–Morris–Pratt", "KMP 字符串匹配算法"],
  "FFT": ["Fast Fourier Transform", "快速傅里叶变换"],
  "GCD": ["Greatest Common Divisor", "最大公约数"],
  "LCM": ["Least Common Multiple", "最小公倍数"],
  "NP": ["Nondeterministic Polynomial time", "非确定性多项式时间"],
  "NPC": ["NP-Complete", "NP 完全"],
  "NP-hard": ["NP-hard", "NP 难"],
  "RAM": ["Random Access Machine", "随机存取机"],
  "I/O": ["Input/Output", "输入/输出"]
};

(function () {
  function esc(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function expand() {
    var path = location.pathname;
    if (path.indexOf("/glossary/") !== -1 || path === "/Algorithms/" || path === "/Algorithms") return;

    var root = document.querySelector(".md-typeset");
    if (!root || root.dataset.glossaryDone || !root.querySelector("h1, p")) return;
    root.dataset.glossaryDone = "1";
    var lang = (document.documentElement.lang || "zh").toLowerCase().indexOf("en") === 0 ? "en" : "zh";

    var skip = {
      CODE: 1, PRE: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
      A: 1, TD: 1, TH: 1, SCRIPT: 1, STYLE: 1, "MJX-CONTAINER": 1
    };
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        while (p && p !== root) {
          if (skip[p.tagName] || (p.classList && p.classList.contains("arithmatex"))) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    var terms = Object.keys(GLOSSARY).sort(function (a, b) { return b.length - a.length; });
    var rx = new RegExp("(?<![A-Za-z0-9])(" + terms.map(esc).join("|") + ")(?![A-Za-z0-9])", "g");
    var done = Object.create(null);

    nodes.forEach(function (node) {
      var text = node.nodeValue;
      if (!text || text.length < 2) return;
      var out = "", last = 0, m;
      rx.lastIndex = 0;
      while ((m = rx.exec(text)) !== null) {
        var term = m[1];
        if (done[term] || !GLOSSARY[term]) continue;
        var start = m.index, end = start + term.length;
        var before = text.slice(0, start);
        var after = text.slice(end);
        if (/^\s*[（(]/.test(after)) continue;
        if (/[（(]\s*$/.test(before)) continue;
        var info = GLOSSARY[term];
        if (lang === "en") {
          out += text.slice(last, start) + term + " (" + info[0] + ")";
        } else {
          out += text.slice(last, start) + term + "（" + info[0] + "，" + info[1] + "）";
        }
        last = end;
        done[term] = true;
      }
      if (last) {
        out += text.slice(last);
        node.nodeValue = out;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", expand);
  } else {
    setTimeout(expand, 0);
  }
  window.addEventListener("load", expand);
  if (typeof document$ !== "undefined") document$.subscribe(expand);
})();
