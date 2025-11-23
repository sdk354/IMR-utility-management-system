import { useParams, Link } from "react-router-dom";
import { MOCK_BILLS } from "../../data/mock";

export default function BillDetails() {
  const { id } = useParams();
  const bill = MOCK_BILLS.find(b => b.id === id);
  if (!bill) return (
    <div className="customer-bg center">
      <div style={{ maxWidth: 600, margin: "40px auto" }} className="box">
        <h3>Bill not found</h3>
        <div className="mt-2 small">Check the bills list.</div>
        <div className="mt-4"><Link to="/customer/bills" className="link">Back to bills</Link></div>
      </div>
    </div>
  );

  return (
    <div className="customer-bg">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="header">
          <div className="title">Bill {bill.id}</div>
          <nav><Link to="/customer/bills" className="small link">Back to bills</Link></nav>
        </div>

        <div className="box">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div className="small">Billing period</div>
              <div style={{ fontWeight: 700 }}>{bill.date} → Due {bill.due}</div>

              <div className="mt-4">
                <div className="small">Usage</div>
                <div>{bill.usage}</div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="small">Amount</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#c2410c" }}>${bill.amount.toFixed(2)}</div>
              <div className="mt-2">{bill.status === "Paid" ? <span className="badge-paid">Paid</span> : <span className="badge-unpaid">Unpaid</span>}</div>

              <div className="mt-4">
                {/* payment is mock - just a button */}
                <button className="btn btn-orange">Pay Now (mock)</button>
              </div>
            </div>
          </div>

          <div className="mt-4 small">Bill breakdown (mock): base charge + consumption charge + taxes. The backend team will provide real data later.</div>
        </div>
      </div>
    </div>
  );
}
