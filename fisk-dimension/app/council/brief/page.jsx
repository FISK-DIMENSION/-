"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { DAO_COUNCIL_WHITELIST } from "@/lib/daoCouncil";

export default function CouncilBrief() {
  const [address, setAddress] = useState(null);
  const [verified, setVerified] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask required.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      await signer.signMessage("Authorize DAO Council Access - Omega-9 Firestorm");

      const userAddress = accounts[0];
      setAddress(userAddress);

      const isWhitelisted = DAO_COUNCIL_WHITELIST.map((wallet) => wallet.toLowerCase()).includes(
        userAddress.toLowerCase()
      );

      setVerified(isWhitelisted);

      if (!isWhitelisted) {
        alert("⚠️ Not on DAO Council whitelist. Viewing watermarked version.");
      }
    } catch (error) {
      console.error("Wallet connection failed", error);
      alert("Connection failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] to-[#302b63] text-white p-6">
      <h1 className="text-3xl font-extrabold text-indigo-400 mb-6 text-center">
        🕳 DAO COUNCIL — PRIVATE DISCLOSURE CHAMBER
      </h1>

      {!address ? (
        <div className="flex flex-col items-center">
          <Button onClick={connectWallet} className="bg-indigo-600 hover:bg-indigo-700">
            Connect Wallet to Verify Access
          </Button>
          <p className="text-sm text-gray-400 mt-3">Encrypted access — DAO Multisig signature required.</p>
        </div>
      ) : (
        <Card className="bg-black/40 border border-indigo-600 rounded-xl relative overflow-hidden">
          {!verified && (
            <div className="absolute inset-0 flex items-center justify-center text-center text-indigo-400 text-2xl font-bold opacity-20 pointer-events-none">
              COUNCIL COPY – ENCRYPTED VIEW
            </div>
          )}
          <CardContent className="p-4">
            <iframe
              src="/FISK_DIMENSION_Private_Disclosure_Brief_Template.pdf"
              className={`w-full h-[80vh] rounded-lg border ${verified ? "border-indigo-700" : "border-red-700"}`}
              title="Private Disclosure Brief"
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              🔐 Viewing {verified ? "verified DAO council" : "restricted"} copy as: {address}
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
