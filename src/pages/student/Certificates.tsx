import { Award, Download, BadgeCheck, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useGetStudentCertificates } from "@/hooks/apis/useStudentQuery";
import type { StudentCertificate } from "@/types/student";

export default function Certificates() {
  const { data, isLoading } = useGetStudentCertificates();

  const certificates: StudentCertificate[] = data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-custom-md bg-brand-royal/10 text-brand-royal flex items-center justify-center">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            My Certificates
          </h1>
          <p className="text-sm text-text-muted">
            Verified credentials you have earned.
          </p>
        </div>
      </div>

      {/* Certificate Grid / Loading / Empty */}
      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-royal" />
        </div>
      ) : certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="bg-white rounded-custom-md flex flex-col"
            >
              <CardContent className="flex-1 space-y-4 pt-6">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-custom-md bg-brand-gold/10 text-brand-wealth flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <Badge className="border-transparent bg-status-success/10 text-status-success">
                    <BadgeCheck className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-sm text-brand-navy leading-snug">
                    {cert.course?.title || "Untitled Course"}
                  </CardTitle>
                  <CardDescription className="text-xs text-text-muted">
                    {cert.course?.instructorName || "Instructor"}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-between rounded-custom-md bg-surface-ghost border border-surface-border px-3 py-2 text-xs">
                  <span className="text-text-muted">
                    Issued{" "}
                    {cert.issuedAt
                      ? new Date(cert.issuedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span className="font-semibold text-brand-royal">
                    Grade: {cert.grade}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Credential ID:{" "}
                  <span className="font-mono font-medium text-text-main truncate block">
                    {cert.credentialId}
                  </span>
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-3.5 w-3.5" />
                  View
                </Button>
                <Button variant="default" size="sm" className="w-full">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white rounded-custom-md">
          <CardContent className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-institutional text-text-muted flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-brand-navy">
              No certificates yet
            </p>
            <p className="text-xs text-text-muted mt-1">
              Complete a course to earn your first certificate.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
