import React from "react";
import Button from "./button";

export default function Table({ className, header, row }) {
  return (
    <>
      <table className={`table ${className || ""}`}>
        <tr className="table__header">
          {header && header.map((element, index) => <th key={index}>{element}</th>)}
        </tr>
        {row &&
          row.map((r) => (
            <tr className="table__row">
              {r.content && r.content.map((content) => <td>{content}</td>)}
              {r.options && (
                <td className="table__row-options">
                  <div>
                    {r.options.map((opt) => (
                      <Button
                        style={{ size: "sm", type: "secondary" }}
                        text={opt.text}
                        onClick={opt.onClick}
                      />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
      </table>
      {!row.length && <span className="table-not-found">Produto não encontrado</span>}
    </>
  );
}
