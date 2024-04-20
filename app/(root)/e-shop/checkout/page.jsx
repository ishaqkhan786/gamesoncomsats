import { getCartItems } from "@/lib/database/actions/cart.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getUserById } from "@/lib/database/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const page = async () => {
  const user = await getServerSession(authOptions);
  const userId = user.user.id.toString();
  const cart = await getCartItems(userId);
  const userDetails = await getUserById(userId);

  // console.log(userDetails);
  // console.log(cart);
  return <Checkout cart={cart} userId={userId} userDetails={userDetails} />;
};

export default page;
