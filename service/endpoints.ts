export enum Endpoints {
  User = "http://localhost:3005/user",
  Data = "http://localhost:3005/data",
  Login = "http://localhost:3005/login",
}

export type loginRequest = {
  email: string;
  password: string;
};

export interface loginResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export type UserRequest = {
  id: string;
};

export interface User {
  uid: string;
  displayName: string;
}

export interface Reservations {
  flight_id: string;
  airline: string;
  aircraft: string;
  departure: {
    city: string;
    airport: string;
    date_time: string;
  };
  arrival: {
    city: string;
    airport: string;
    date_time: string;
  };
  price: string;
  currency: string;
  passengers: {
    name: string;
    ticket_type: string;
    comment: string;
  }[];
}

const HomeService = {
  login: async (data: loginRequest): Promise<loginResponse> => {
    const response = await fetch(Endpoints.Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  user: async (data: UserRequest): Promise<User> => {
    const response = await fetch(`${Endpoints.User}?id=${data.id}`);
    return response.json();
  },
  data: async (token: string): Promise<Reservations[]> => {
    const response = await fetch(Endpoints.Data, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
export default HomeService;
