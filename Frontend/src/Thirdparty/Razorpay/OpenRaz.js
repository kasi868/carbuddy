import { useNavigate } from "react-router-dom";
import Razorpay from "./RazorpayFromAppointment";
import { useState } from "react";

const OpenRaz = ({ setIsModalOpen, payement, update, selectedAddress, cartItems, setPlacingOrder, appliedCoupon }) => {
  const navigate = useNavigate();

  // 🔹 Save order after payment success
  const handlePlaceOrder = async (razorpayResponse) => {
    if (!selectedAddress) return alert("Please select an address");
    if (cartItems.length === 0) return alert("Cart is empty");

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id?.toString() || item.id?.toString() || "",
        name: item.name || "Unknown",
        type: item.type || "default",
        qty: item.qty || 1,
        price: item.price || 0,
      })),
      totalAmount: payement,
      address: selectedAddress,
      status: "Paid",

      // 🆕 Razorpay details
      razorpayPaymentId: razorpayResponse?.razorpay_payment_id,
      razorpayOrderId: razorpayResponse?.razorpay_order_id,
      razorpaySignature: razorpayResponse?.razorpay_signature,

      // 🆕 Coupon details
      coupon: appliedCoupon
        ? {
            code: appliedCoupon.code,
            discount: appliedCoupon.discount,
            // celebrity: appliedCoupon.celebrity || null,
              createdBy: appliedCoupon.createdBy

          }
        : null,
    };

    try {
      setPlacingOrder(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully!");
        console.log("Order Saved:", data);

        // ✅ Clear checkout + cart
        localStorage.removeItem("checkoutItems");
        localStorage.removeItem("cartItems");
        
        navigate("/myorders"); // redirect to Orders page
        window.location.reload();
      } else {
        alert("❌ " + (data.error || data.message));
      }
    } catch (err) {
      console.error("Order save error:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div>
      {payement && (
        <Razorpay
          parentCallback={handlePlaceOrder} // 🔹 Pass success callback
          amount={payement * 100} // Razorpay expects paise (e.g., ₹1 → 100)
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default OpenRaz;
