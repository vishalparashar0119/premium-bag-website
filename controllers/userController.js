import UserModel from "../models/UserModel.js";

export const myAccount = async (req, res) => {

      try {
            const user = await UserModel.findOne({ email: req.user.email }).populate('orderHistory').select('-password')
            return res.status(200).json({ success: true, user: user });
      } catch (error) {
            return res.status(500).json({ success: false, message: 'internal server error' })
      }

}


export const addToCart = async (req, res) => {
      try {
            const { email } = req.user;
            const { id } = req.params;
            const user = await UserModel.findOne({ email: email });

            if (user.cart.includes(id)) return res.status(409).json({ success: false, message: 'Already have in cart' });

            user.cart.push(id);
            await user.save()
            return res.status(200).json({ success: true, message: 'Add to cart successfully' });

      } catch (error) {
            console.log('add to cart api::', error.message);
            return res.status(400).json({ success: false, message: ' somting went wrong' })
      }
}

export const fetchDataFromCart = async (req, res) => {
      try {
            const { email } = req.user;
            const cartData = await UserModel.findOne({ email }).select('cart').populate('cart');

            return res.status(200).json({ success: true, cartData: cartData })
      } catch (error) {
            console.log('fetch data from cart api ::', error.message);
            return res.status(500).json({ success: false, message: 'somthing went wrong please try again' });
      }
}

export const removeToCart = async (req, res) => {
      try {
            const { id } = req.params;
            const { email } = req.user;

            const user = await UserModel.findOne({ email: email }).select('-password');


            if (user.cart.includes(id)) {
                  user.cart = user.cart.filter((items) => { return items.toString() !== id });
                  await user.save()

                  return res.status(200).json({ success: true, message: 'Remove from cart successfully' })
            }


            return res.status(404).json({ success: false, message: 'product not found in cart' })


      } catch (error) {
            console.log(error.message)
      }
}