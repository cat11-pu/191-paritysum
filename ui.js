// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，点按钮看奇偶分组。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.values || []).forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个 " + value;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.parities[spot] === "even" ? " ok" : "");
      mark.textContent = view.parities[spot] === "even" ? "偶数" : "奇数";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "偶数和 " + view.even_sum + "（" + view.even_count + " 个），奇数和 " + view.odd_sum
      + "（" + view.odd_count + " 个）";
    parts.log.textContent = "总计 " + view.total;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "分组求和";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个偶数";
  addButton.addEventListener("click", function () {
    spec.values = (spec.values || []).concat([8]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.values = (spec.values || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "6";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { values: (spec.values || []).concat([parsed]) }));
        parts.out.textContent = "加入 " + parsed + " 后偶数和 " + view.even_sum + "、奇数和 " + view.odd_sum;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看两个和";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "偶数和 " + view.even_sum + "，奇数和 " + view.odd_sum;
  });
  parts.controls.appendChild(readButton);

  draw();
}
