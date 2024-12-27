import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit } from 'lucide-react';

type Company = {
  id: number;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number;
};

type CommunicationMethod = {
  id: number;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
};

const AdminModule = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [communicationMethods, setCommunicationMethods] = useState<CommunicationMethod[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleAddCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCompany: Company = {
      id: Date.now(),
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      linkedinProfile: formData.get('linkedinProfile') as string,
      emails: [(formData.get('email') as string)],
      phoneNumbers: [(formData.get('phone') as string)],
      comments: formData.get('comments') as string,
      communicationPeriodicity: parseInt(formData.get('periodicity') as string),
    };

    setCompanies([...companies, newCompany]);
    e.currentTarget.reset();
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="companies">
        <TabsList>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="communication-methods">Communication Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Company Management</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCompany} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                    <Input id="linkedinProfile" name="linkedinProfile" type="url" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Primary Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Primary Phone</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="periodicity">Communication Periodicity (days)</Label>
                    <Input id="periodicity" name="periodicity" type="number" min="1" required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="comments">Comments</Label>
                    <Input id="comments" name="comments" />
                  </div>
                </div>
                <Button type="submit">Add Company</Button>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Companies List</h3>
                <div className="space-y-4">
                  {companies.map(company => (
                    <Card key={company.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div>
                          <h4 className="font-semibold">{company.name}</h4>
                          <p className="text-sm text-gray-500">{company.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingCompany(company)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setCompanies(companies.filter(c => c.id !== company.id));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication-methods">
          <Card>
            <CardHeader>
              <CardTitle>Communication Methods</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Communication Methods management UI */}
              <div className="space-y-4">
                {[
                  { id: 1, name: "LinkedIn Post", sequence: 1 },
                  { id: 2, name: "LinkedIn Message", sequence: 2 },
                  { id: 3, name: "Email", sequence: 3 },
                  { id: 4, name: "Phone Call", sequence: 4 },
                  { id: 5, name: "Other", sequence: 5 }
                ].map(method => (
                  <div key={method.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{method.name}</span>
                    <span className="text-gray-500">Sequence: {method.sequence}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminModule;
