"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  employee?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_creator: boolean;
    supplier?: {
      id: string;
      supplier_name: string;
    };
  };
  message?: string;
  smsOtpRequired?: boolean;
  userId?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [smsOtpRequired, setSmsOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      const response: LoginResponse = data;

      // Si requiere OTP SMS
      if (response.smsOtpRequired && response.userId) {
        setSmsOtpRequired(true);
        setUserId(response.userId);
        setError("");
        return;
      }

      // Si tiene tokens, guardar y redirigir
      if (response.access_token && response.employee) {
        login(
          {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          },
          response.employee
        );

        // Redirigir a home
        router.push("/home");
        return;
      }

      setError("Error al obtener token de autenticación.");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Error al iniciar sesión. Verifica tus credenciales.";
      setError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login/sms-verify", {
        userId,
        otp,
      });
      const response: LoginResponse = data;

      if (response.access_token && response.employee) {
        login(
          {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          },
          response.employee
        );

        // Redirigir a home
        router.push("/home");
        return;
      }

      setError("Error al verificar OTP.");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Error al verificar código OTP.";
      setError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setSmsOtpRequired(false);
    setOtp("");
    setUserId("");
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Card className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {smsOtpRequired ? "Verificación SMS" : "Iniciar Sesión"}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {smsOtpRequired
              ? "Ingresa el código de verificación enviado a tu teléfono"
              : "Ingresa tus credenciales para acceder a tu cuenta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!smsOtpRequired ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Código de verificación</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  required
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 text-center text-lg tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-gray-400 text-center">
                  Ingresa el código de 6 dígitos enviado a tu teléfono
                </p>
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verificando..." : "Verificar Código"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToLogin}
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                  disabled={isLoading}
                >
                  Volver al login
                </Button>
              </div>
            </form>
          )}
          {!smsOtpRequired && (
            <div className="mt-4 text-center">
              <Link
                href="/register"
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                ¿No tienes cuenta? Regístrate aquí
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
