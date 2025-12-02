import React, { useEffect } from "react";
import { css } from "../../ConfigFiles/Consts";

const Raz = ({ amount, parentCallback }) => {
  const options = {
    key: "rzp_test_0Pmy6dBozgLBY0",
    amount: amount?.toString(),
    name: "Swacchh",
    description: "Swacchh",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (res) {
        parentCallback(res)
      console.log(res, "res");
      //   parentCallback({paymentType:"Razorpay", paymentStatus: "Paid" })
      // parentCallback({paymentType:"Razorpay", paymentStatus: "Paid" });
      //   alert(response.razorpay_payment_id);
    },
    prefill: {
      name: "Swacchh",
      contact: "9999999999",
      email: "sv@demo.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: css.themeColor,
      hide_topbar: false,
    },
  };

  const openPayModal = (options) => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    openPayModal(options);
  }, []);

  return <></>;
};
export default Raz;
