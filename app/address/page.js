"use client";

import MainLayout from "../layouts/MainLayout";
import TextInput from "../components/TextInput";


export default function Address() {
    return (
        <>

          <MainLayout>
             <div
               id="AddressPage"
               className="mt-4 max-w-[600px] mx-auto px-2"
             >
                <div className="p-3 mx-auto bg-white rounded-lg">
                    <div className="mb-2 text-xl text-bold">
                        Address Details
                    </div>
                    <form>
                        <div className="mb-4">
                            <TextInput 
                               className="w-full"
                               string={'TEST'}
                               placeholder="Name"
                               error="This is an error"
                            />
                        </div>

                        <button className="w-full p-3 mt-6 text-lg font-semibold text-white bg-blue-600 rounded">
                            Update Address
                        </button>
                    </form>

                </div>

             </div>
          </MainLayout>
        </>
    )
}