import React from 'react'
import Navbar from '../nav/Navbar'

const Setting = () => {
  return (
    <>
     <Navbar/>      

          <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
              <h1 class="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>

              <div class="mb-6">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">1. Acceptance of Terms</h2>
                  <p class="text-gray-600">By accessing or using [Your Website Name] ("the Website"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you should not use the Website.</p>
              </div>

              <div class="mb-6">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">2. Services Provided</h2>
                  <p class="text-gray-600">The Website acts as a platform to connect users with labor providers. We facilitate the connection but do not guarantee the responsiveness or performance of any labor provider.</p>
              </div>

              <div class="mb-6">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">3. Disclaimer of Responsibility</h2>
                  <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                          <tr>
                              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsibility</th>
                              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                          </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200 overflow-hidden">
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">Responsiveness</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">While we strive to provide a reliable platform for connecting users with labor providers, [Labour help] is not responsible for the availability.</td>
                          </tr>
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Liability for Non-Response</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">[Your Website Name] shall not be held liable for any failure of labor providers to respond or engage with you. Any interactions, agreements.</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <div class="mb-6">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">4. User Obligations</h2>
                  <p class="text-gray-600">You agree to use the Website in accordance with these Terms and Conditions and any applicable laws and regulations. You are responsible for your interactions with labor providers and any agreements or transactions made as a result.</p>
              </div>

              <div class="mb-6">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">5. Limitation of Liability</h2>
                  <p class="text-gray-600">To the fullest extent permitted by law, [Your Website Name] shall not be liable for any indirect, incidental, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
                  <ul class="list-disc list-inside text-gray-600 mt-2">
                      <li>Your use of or inability to use the Website.</li>
                      <li>Any unauthorized access to or use of the Website.</li>
                      <li>Any interruption or cessation of transmission to or from the Website.</li>
                  </ul>
              </div>

              <div class="mb-6">
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">6. Changes to Terms</h2>
                  <p class="text-gray-600">We reserve the right to update or modify these Terms and Conditions at any time. Your continued use of the Website following any changes constitutes acceptance of the new terms.</p>
              </div>

              <div>
                  <h2 class="text-2xl font-semibold text-gray-700 mb-2">7. Contact Information</h2>
                  <p class="text-gray-600">If you have any questions about these Terms and Conditions labourhelp23@gmail.com.</p>
              </div>
          </div>
     


    </>
  )
}

export default Setting