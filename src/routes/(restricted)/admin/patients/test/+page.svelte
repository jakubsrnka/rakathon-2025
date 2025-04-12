<script>
  import Button from '$components/ui/button/button.svelte';
  import { Input } from '$components/ui/input';
  import { Textarea } from '$components/ui/textarea';
</script>

<div class="space-y-4">
  <!-- Medicine Type Input -->
  <div>
    <label for="medicineType" class="block text-sm font-medium text-gray-700">Medicine Type</label>
    <Input
      id="medicineType"
      type="text"
      placeholder="Enter medicine type"
      class="mt-1 block w-full"
    />
  </div>

  <!-- Message Type Input -->
  <div>
    <label for="messageType" class="block text-sm font-medium text-gray-700">Message Type</label>
    <Input
      id="messageType"
      type="text"
      placeholder="Enter message type"
      class="mt-1 block w-full"
    />
  </div>

  <!-- Large Text Block -->
  <div>
    <label for="largeText" class="block text-sm font-medium text-gray-700">Details</label>
    <Textarea id="largeText" placeholder="Enter detailed message" class="h-32"></Textarea>
  </div>
</div>

<Button href="/admin/patients">Generate</Button>
